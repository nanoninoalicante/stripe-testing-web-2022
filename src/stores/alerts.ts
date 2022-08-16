import { defineStore } from 'pinia'
type AlertsState = {
  alerts: any[]
}
export const useAlertsStore = defineStore({
  id: 'alerts',
  state: () => ({
    alerts: []
  } as AlertsState),
  actions: {
    setAlert(message: string) {
      this.alerts.push({ message });
    },
    deleteAlert() {
      this.alerts = [];
    }
  }
})
