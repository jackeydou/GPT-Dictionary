#[cfg(target_os = "macos")]
pub fn query_accessibility_permissions() -> bool {
    let trusted = macos_accessibility_client::accessibility::application_is_trusted_with_prompt();
    if trusted {
        println!("Application is totally trusted!");
    } else {
      println!("Application isn't trusted :(");
    }
    return trusted
}

#[cfg(not(target_os = "macos"))]
pub fn query_accessibility_permissions() -> bool {
    print!("Who knows... 🤷‍♀️");
    return true
}