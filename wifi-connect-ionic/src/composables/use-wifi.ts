import { Ref, ref } from "vue"
import { useStorage } from "./use-storage"

import { ConnectionState, ConnectionStateValue, WifiConnect } from 'wifi-connect'

const WIFI_CONFIGS_STORAGE_KEY = 'WIFI_CONFIGS_STORAGE_KEY'
const wifiConfigs: Ref<WiFiConfig[]> = ref([])

async function fetchWifiConfigs() {
  const storage = useStorage()

  const configs = await storage.get(WIFI_CONFIGS_STORAGE_KEY)

  if (configs) {
    wifiConfigs.value = JSON.parse(configs) as WiFiConfig[]
  }
}

async function getCurrentSSID() {

  throw new Error('not implemented')
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

  return connectionState
}

export function useWiFi() {
  return {
    wifiConfigs,
    fetchWifiConfigs,
    getCurrentSSID,
    addWifiConfig,
    connectToWifi
  }
}

export interface WiFiConfig {
  ssid: string,
  passphrase: string
}