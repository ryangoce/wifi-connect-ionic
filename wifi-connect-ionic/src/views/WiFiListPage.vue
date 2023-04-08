<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="primary">
        <ion-button  router-link="/add-wifi">
          <ion-icon slot="icon-only" :ios="add" :md="add"></ion-icon>
        </ion-button>
      </ion-buttons>
        <ion-title>Select a Wi-Fi Network</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item button v-for="(config) in wifiConfigs" :key="config.ssid" @click="connect(config)">
          <ion-label>{{ config.ssid }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-loading :is-open="isLoadingOpenRef" message="Connecting..." @didDismiss="showLoading(false)"></ion-loading>
 
  </ion-page>
</template>

<script setup lang="ts">

import { add } from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonLoading
} from '@ionic/vue';
import { useWiFi, WiFiConfig } from '@/composables/use-wifi';
import { ConnectionStateValue } from 'wifi-connect';
import { ref } from 'vue';

const isLoadingOpenRef = ref(false)
const showLoading = (state: boolean) => isLoadingOpenRef.value = state;
const wifi = useWiFi()
const wifiConfigs = wifi.wifiConfigs

const connect = async (config: WiFiConfig) => {
  try {
    showLoading(true)
    const connectionState = await wifi.connectToWifi(config)

    switch (connectionState.value) {
      case ConnectionStateValue.Success:
        alert('connection to wifi successful')
        break;

      case ConnectionStateValue.NoConnection:
        alert('cannot connect to wifi')
        break;
      case ConnectionStateValue.Denied:
        alert('connection to wifi denied')
        break;

      case ConnectionStateValue.UnknownSSID:
        alert('unknown ssid')
        break;

      case ConnectionStateValue.CannotConnect:
        alert('cannot connect to wifi')
        break;
        
      default:
        alert('unknown connection state')
        break;
    }
  } catch (error) {
    alert('cannot connect to wifi')
  } finally {
    showLoading(false)
  }
}
wifi.fetchWifiConfigs()
</script>
