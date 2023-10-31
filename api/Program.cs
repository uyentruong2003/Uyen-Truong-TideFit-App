using Microsoft.AspNetCore.Cors;
using System.Data.SQLite;

string cs = @"URI=file:C:\Users\uyenk\OneDrive - The University of Alabama\JS\Uyen-Truong-TideFit-App\api\Database.db";
using var con = new SQLiteConnection (cs);
con.Open();
con.Close();


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// COPIED FROM SLIDES TO OVERWRITE THE CORS POLICY
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenPolicy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("OpenPolicy");

app.MapControllers();

app.Run();



