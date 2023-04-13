<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>WiFi Ionic POC</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">WiFi Ionic POC</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item button router-link="/wifis">
          <ion-label>Select a Wi-Fi Network</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { ref } from 'vue';

const messages = ref<Message[]>(getMessages());

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>
