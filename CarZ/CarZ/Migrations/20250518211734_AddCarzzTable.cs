using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarZ.Migrations
{
    /// <inheritdoc />
    public partial class AddCarzzTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "bookedcustid",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bookedcustid",
                table: "Cars");
        }
    }
}
