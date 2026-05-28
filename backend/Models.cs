using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.Api.Models
{
    public class PortfolioProfile
    {
        [Key]
        public string Id { get; set; } = "default";
        public string Name { get; set; } = "Alex Morgan";
        public string Headline { get; set; } = "Creative Frontend Engineer";
        [MaxLength(2000)]
        public string Bio { get; set; } = "";
        public string AvatarUrl { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Location { get; set; } = "";
        public string GithubUrl { get; set; } = "";
        public string LinkedinUrl { get; set; } = "";
        public int Experience { get; set; } = 3;
        public int ProjectsCount { get; set; } = 18;
        public int ClientsCount { get; set; } = 12;
        public string AccentColor { get; set; } = "#4f46e5";
    }

    public class CoreCompetency
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        [MaxLength(1000)]
        public string Desc { get; set; } = "";
    }

    public class WorkExperience
    {
        public int Id { get; set; }
        public string Company { get; set; } = "";
        public string Role { get; set; } = "";
        public string Duration { get; set; } = "";
        [MaxLength(1000)]
        public string Summary { get; set; } = "";
    }

    public class EducationEntry
    {
        public int Id { get; set; }
        public string School { get; set; } = "";
        public string Degree { get; set; } = "";
        public string Duration { get; set; } = "";
        public string Cgpa { get; set; } = "";
        [MaxLength(1000)]
        public string Summary { get; set; } = "";
    }

    public class ProjectItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        [MaxLength(1000)]
        public string Desc { get; set; } = "";
        public string Link { get; set; } = "";
    }

    public class TestimonialItem
    {
        public int Id { get; set; }
        public string Author { get; set; } = "";
        public string Designation { get; set; } = "";
        [MaxLength(1000)]
        public string Text { get; set; } = "";
    }

    public class ContactMessage
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        [MaxLength(2000)]
        public string Body { get; set; } = "";
        public string Date { get; set; } = "";
    }

    public class PortfolioPayload
    {
        public PortfolioProfile Profile { get; set; } = new();
        public List<CoreCompetency> CoreCompetencies { get; set; } = new();
        public List<WorkExperience> WorkExperiences { get; set; } = new();
        public List<EducationEntry> EducationList { get; set; } = new();
        public List<ProjectItem> Projects { get; set; } = new();
        public List<TestimonialItem> Testimonials { get; set; } = new();
    }
}
