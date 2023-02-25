import { isRegistered, register, unregister } from '@tauri-apps/api/globalShortcut';

export const KeyboardMap = {
  command: 'CommandOrControl',
  shift: 'Shift',
  option: 'Alt'
}

const defaultGlobalSearchShortcut = 'Alt+S';

export function getShortcurStringByKeys(keys: string[]) {
  return keys.join('+');
}

export async function checkShortcurRegistered(shortcut: string): Promise<boolean> {
  const registered = await isRegistered(shortcut);
  return registered;
}

export async function registerShortcut(shortcut: string, callback: (shortcut?: string) => void) {
  await register(shortcut, (shortcut) => {
    callback(shortcut);
  });
}

export async function unregisterShortcut(shortcut: string) {
  await unregister(shortcut);
}
