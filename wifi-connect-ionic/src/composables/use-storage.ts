import { Preferences } from '@capacitor/preferences';

async function set(key: string, value: string) {
  await Preferences.set({
    key,
    value
  });
}

async function get(key: string) {
  const result = await Preferences.get({
    key
  })
  if (result) {
    return result.value
  } else {
    return undefined
  }

}

async function remove(key: string) {
  await Preferences.remove({
    key
  })
}

export function useStorage() {
  return {
    get,
    set,
    remove
  }
}