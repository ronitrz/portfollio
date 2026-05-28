using Microsoft.EntityFrameworkCore;
using PortfolioApp.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Read MySQL connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=localhost;Database=portfolio_db;Uid=root;Pwd=;";

// Register MySQL DbContext using Pomelo
builder.Services.AddDbContext<PortfolioDbContext>(opt =>
    opt.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Enable CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AngularCorsPolicy");

// Ensure MySQL database schema exists and seed default values on startup
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        db.Database.EnsureCreated();
        
        // Seed default profile details if completely empty
        if (!db.Profiles.Any())
        {
            db.Profiles.Add(new PortfolioProfile());
            
            db.Competencies.AddRange(new[] {
                new CoreCompetency { Title = "Angular Standalone Framework", Desc = "Building state-of-the-art Single Page Applications using Angular standalone modules, reactive state management, custom routing paths, and reusable code bases." },
                new CoreCompetency { Title = "Creative UI/UX Design", Desc = "Crafting stunning glassmorphism surfaces, tailored light/dark variables, premium high-contrast typography, and fluid micro-interactions that engage." },
                new CoreCompetency { Title = "Performance & SEO", Desc = "Ensuring lightning-fast page loading speeds, high SEO indexing, hardware-accelerated CSS animations, clean markup structures, and responsive grid layouts." }
            });

            db.WorkExperiences.AddRange(new[] {
                new WorkExperience { Company = "TechCorp Solutions", Role = "Senior Frontend Architect", Duration = "2024 - Present", Summary = "Designed and deployed advanced client-side micro-frontends using Angular standalone modular shells." },
                new WorkExperience { Company = "Innovate Design", Role = "UI Engineer", Duration = "2022 - 2024", Summary = "Crafted pixel-perfect layout customizers, tailored glassmorphism variables, and responsive timeline widgets." }
            });

            db.Educations.AddRange(new[] {
                new EducationEntry { School = "Stanford University", Degree = "Bachelor of Science in Computer Science", Duration = "2018 - 2022", Cgpa = "3.91/4.0", Summary = "Graduated with Honors. Specialization in Human-Computer Interaction and Client-Side Web Architecture." }
            });

            db.Projects.AddRange(new[] {
                new ProjectItem { Name = "Glassmorphic Analytics Dashboard", Category = "Web", Desc = "A premium, high-contrast analytics dashboard with real-time charting and dark mode.", Link = "https://github.com" },
                new ProjectItem { Name = "Minimalist Portfolio Template", Category = "Design", Desc = "Clean, snow-white portfolio design optimized for frontend engineers and designers.", Link = "https://github.com" },
                new ProjectItem { Name = "Fitness Mobile Application", Category = "Mobile", Desc = "An intuitive native mobile app for tracking workouts, nutrition schedules, and fitness goals.", Link = "https://github.com" }
            });

            db.Testimonials.AddRange(new[] {
                new TestimonialItem { Author = "Emily Stone", Designation = "Director of Products at Innovate", Text = "Alex Morgan is an exceptional frontend developer. His glassmorphism aesthetics and pixel-perfect responsiveness saved our team months of UI redesign work!" },
                new TestimonialItem { Author = "Marcus Vance", Designation = "CTO at TechScale Inc.", Text = "The cleanest codebase we have integrated. Absolute outstanding mastery of single page client frameworks and dynamic customizer variables!" }
            });

            db.SaveChanges();
            Console.WriteLine("MySQL database initialized and seeded with premium default data!");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"[CRITICAL INFO] MySQL server was not accessible during boot: {ex.Message}");
    Console.WriteLine("The API is running, and the frontend will fallback to browser storage until MySQL is started.");
}

// REST ENDPOINTS

// 1. Fetch entire portfolio package
app.MapGet("/api/portfolio", async (PortfolioDbContext db) =>
{
    var profile = await db.Profiles.FirstOrDefaultAsync() ?? new PortfolioProfile();
    var competencies = await db.Competencies.ToListAsync();
    var experience = await db.WorkExperiences.ToListAsync();
    var educations = await db.Educations.ToListAsync();
    var projects = await db.Projects.ToListAsync();
    var testimonials = await db.Testimonials.ToListAsync();

    return Results.Ok(new PortfolioPayload
    {
        Profile = profile,
        CoreCompetencies = competencies,
        WorkExperiences = experience,
        EducationList = educations,
        Projects = projects,
        Testimonials = testimonials
    });
});

// 2. Save full unified state updates
app.MapPost("/api/portfolio/save", async (PortfolioPayload payload, PortfolioDbContext db) =>
{
    var profile = await db.Profiles.FirstOrDefaultAsync();
    if (profile == null)
    {
        profile = new PortfolioProfile();
        db.Profiles.Add(profile);
    }
    
    // Copy profile details
    profile.Name = payload.Profile.Name;
    profile.Headline = payload.Profile.Headline;
    profile.Bio = payload.Profile.Bio;
    profile.AvatarUrl = payload.Profile.AvatarUrl;
    profile.Email = payload.Profile.Email;
    profile.Phone = payload.Profile.Phone;
    profile.Location = payload.Profile.Location;
    profile.GithubUrl = payload.Profile.GithubUrl;
    profile.LinkedinUrl = payload.Profile.LinkedinUrl;
    profile.Experience = payload.Profile.Experience;
    profile.ProjectsCount = payload.Profile.ProjectsCount;
    profile.ClientsCount = payload.Profile.ClientsCount;
    profile.AccentColor = payload.Profile.AccentColor;

    // Overwrite database collections
    db.Competencies.RemoveRange(db.Competencies);
    db.Competencies.AddRange(payload.CoreCompetencies);

    db.WorkExperiences.RemoveRange(db.WorkExperiences);
    db.WorkExperiences.AddRange(payload.WorkExperiences);

    db.Educations.RemoveRange(db.Educations);
    db.Educations.AddRange(payload.EducationList);

    db.Projects.RemoveRange(db.Projects);
    db.Projects.AddRange(payload.Projects);

    db.Testimonials.RemoveRange(db.Testimonials);
    db.Testimonials.AddRange(payload.Testimonials);

    await db.SaveChangesAsync();
    return Results.Ok(new { message = "Portfolio MySQL database saved successfully!" });
});

// 3. Contact Form Submission Logs
app.MapGet("/api/contact", async (PortfolioDbContext db) => 
    Results.Ok(await db.ContactMessages.ToListAsync()));

app.MapPost("/api/contact", async (ContactMessage msg, PortfolioDbContext db) =>
{
    db.ContactMessages.Add(msg);
    await db.SaveChangesAsync();
    return Results.Created($"/api/contact/{msg.Id}", msg);
});

app.MapDelete("/api/contact/{id:int}", async (int id, PortfolioDbContext db) =>
{
    var msg = await db.ContactMessages.FindAsync(id);
    if (msg == null) return Results.NotFound();
    db.ContactMessages.Remove(msg);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

// Database Context definition
public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }
    
    public DbSet<PortfolioProfile> Profiles => Set<PortfolioProfile>();
    public DbSet<CoreCompetency> Competencies => Set<CoreCompetency>();
    public DbSet<WorkExperience> WorkExperiences => Set<WorkExperience>();
    public DbSet<EducationEntry> Educations => Set<EducationEntry>();
    public DbSet<ProjectItem> Projects => Set<ProjectItem>();
    public DbSet<TestimonialItem> Testimonials => Set<TestimonialItem>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
}
