
use actix_web::{get, HttpResponse};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct JsonTest {
    message: String
}

#[get("/v1/h")]
pub async fn hello() -> String {
    format!("Hello")
}

#[get("/v1/json")]
pub async fn json_test() -> HttpResponse {
    println!("A user hit this API!");
    let resp_json = JsonTest {
        message: format!("Hello from json")
    };
    HttpResponse::Ok().json(resp_json)
}

