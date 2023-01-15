package main

import (
	"fmt"
	"github.com/CamJak/Boss-Integrated-Scheduler/tree/main/API/repositories/repo_interface"
	"github.com/CamJak/Boss-Integrated-Scheduler/tree/main/API/routes"
	// "github.com/gofiber/fiber"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"os"
	// "gorm.io/driver/postgres"
	// "gorm.io/gorm"
)

func initializeServer() {
	envErr := godotenv.Load("./.env")
	if envErr != nil {
		fmt.Printf("Could not load environment variables\n")
	}
	fmt.Println(os.Environ())
	// create fiberv2 app instance
	app := fiber.New()
	// initialize database interface
	repo_interface.Init()
	routes.Init(app)
}

func main() {

	repo_interface.Init()
}
