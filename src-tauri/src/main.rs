#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use enigo::*;
mod accessibility;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn app_focus_and_copy_selection(window: tauri::Window) {
    // let mut enigo = Enigo::new();
    let trusted = accessibility::query_accessibility_permissions();
    if trusted {
        // copy
        // enigo will cause app crash now, comment out
        // related issue: https://github.com/enigo-rs/enigo/issues/153

        // enigo.key_down(Key::Meta);
        // enigo.key_click(Key::Layout('c'));
        // enigo.key_up(Key::Meta);

        window.set_focus().unwrap();
    }
}

fn main() {
    let mut app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, app_focus_and_copy_selection])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
