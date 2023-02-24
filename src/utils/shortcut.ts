import { isRegistered, register, unregister } from '@tauri-apps/api/globalShortcut';


export async function checkShortcurRegistered(): Promise<boolean> {
  const registered = await isRegistered('CommandOrControl+P');
  
  return registered;
}

export async function registerShortcut() {
  await register('CommandOrControl+Shift+C', () => {
    console.log('Shortcut triggered');
  });
}

export async function unregisterShortcut() {
  await unregister('CommandOrControl+Shift+C');
}
