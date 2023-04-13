import { Ref, ref } from "vue"
import { useStorage } from "./use-storage"

import { ConnectionState, ConnectionStateValue, WifiConnect } from 'wifi-connect'

const WIFI_CONFIGS_STORAGE_KEY = 'WIFI_CONFIGS_STORAGE_KEY'
const wifiConfigs: Ref<WiFiConfig[]> = ref([])
const currentSSID: Ref<string | undefined> = ref(undefined)

async function fetchWifiConfigs() {
  const storage = useStorage()

  const configs = await storage.get(WIFI_CONFIGS_STORAGE_KEY)

  if (configs) {
    wifiConfigs.value = JSON.parse(configs) as WiFiConfig[]
  }
}

async function fetchCurrentSSID() {
  const ssid = await WifiConnect.getCurrentSSID()

  if (ssid) {
    currentSSID.value = ssid.name
  }
}

async function addWifiConfig(wifiConfig: WiFiConfig) {
  const storage = useStorage()
  
  wifiConfigs.value.push(wifiConfig)

  await storage.set(WIFI_CONFIGS_STORAGE_KEY, JSON.stringify(wifiConfigs.value))
}

async function connectToWifi(wifiConfig: WiFiConfig): Promise<ConnectionState> {
  const connectionState = await WifiConnect.connect({
    ssid: wifiConfig.ssid,
    passphrase: wifiConfig.passphrase,
    saveNetwork: false,
    isWep: false
  })

  await fetchCurrentSSID()

  return connectionState
}

async function init() {
  await fetchCurrentSSID()
}

export function useWiFi() {
  return {
    wifiConfigs,
    currentSSID,
    init,
    fetchWifiConfigs,
    fetchCurrentSSID,
    addWifiConfig,
    connectToWifi
  }
}

export interface WiFiConfig {
  ssid: string,
  passphrase: string
}