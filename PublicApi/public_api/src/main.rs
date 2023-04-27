use std::time::Duration;
use actix_extensible_rate_limit::{
    backend::{self, memory::InMemoryBackend, SimpleInputFunctionBuilder},
    RateLimiter,
};
use actix_web::{get, web, App, HttpServer};

mod v1;

struct AppState {
    app_name: String,
}

#[get("/")]
async fn index(data: web::Data<AppState>) -> String {
    let app_name = &data.app_name; // <- get app_name
    format!("Hello {app_name}!") // <- response with app_name
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // store data about a requester's activity
    let store = InMemoryBackend::builder().build();
    HttpServer::new(move || {
        // limit a user to 10 requests per minute by IP
        let input = SimpleInputFunctionBuilder::new(Duration::from_secs(60), 10)
            .real_ip_key()
            .build();

        let middleware = RateLimiter::builder(store.clone(), input)
            .add_headers()
            .build();

        App::new()
            .app_data(web::Data::new(AppState {
                app_name: String::from("Actix Web"),
            }))
            .wrap(middleware)
            .service(index)
            .service(v1::hello)
            .service(v1::json_test)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
