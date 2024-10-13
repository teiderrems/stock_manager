using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class addotherproperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Pictures_PictureId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_PictureId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "PictureId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Pictures",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MaxPrice",
                table: "Items",
                type: "decimal(10,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MinPrice",
                table: "Items",
                type: "decimal(10,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "StockQuantity",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_ItemId",
                table: "Pictures",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_Items_ItemId",
                table: "Pictures",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pictures_Items_ItemId",
                table: "Pictures");

            migrationBuilder.DropIndex(
                name: "IX_Pictures_ItemId",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "MaxPrice",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "MinPrice",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "StockQuantity",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "PictureId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_PictureId",
                table: "Items",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Pictures_PictureId",
                table: "Items",
                column: "PictureId",
                principalTable: "Pictures",
                principalColumn: "Id");
        }
    }
}
