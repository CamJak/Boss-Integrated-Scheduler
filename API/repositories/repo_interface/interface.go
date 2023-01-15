package repo_interface

import (
	// "database/sql"
	"fmt"
	"os"
	// "strings"

	// _ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() {
	// connStr := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s",
	//   os.Getenv("PGUSER"),
	//   os.Getenv("PGPASSWORD"),
	//   os.Getenv("PGHOST"),
	//   os.Getenv("PGPORT"),
	//   os.Getenv("PGDATABASE"))
	// fmt.Printf("connection string: %s", connStr)
	fmt.Printf("%s is PGUSER", os.Getenv("PGUSER"))
	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=US/Central",
		os.Getenv("PGHOST"),
		os.Getenv("PGUSER"),
		os.Getenv("PGPASSWORD"),
		os.Getenv("PGDATABASE"),
		os.Getenv("PGPORT"))
	fmt.Printf("alternative connection string: %s", connStr)

	_, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})

	if err != nil {
		fmt.Printf("Could not connect to database!")
	}
}
