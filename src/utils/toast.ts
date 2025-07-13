import type { PluginOptions } from 'vue-toastification'
import { POSITION, TYPE, useToast } from 'vue-toastification'

const toast = useToast()
function showToast(message: string, type: TYPE, options?: PluginOptions) {
  toast(message, {
    type,
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    bodyClassName: '!text-sm flex items-center',
    toastClassName: '!p-4',
    ...options,
  })
}
export function showSuccess(message: string, option?: PluginOptions) {
  showToast(message, TYPE.SUCCESS, option)
}
export function showError(message: string, option?: PluginOptions) {
  showToast(message, TYPE.ERROR, option)
}
export function showInfo(message: string, option?: PluginOptions) {
  showToast(message, TYPE.INFO, option)
}
export function showWarning(message: string, option?: PluginOptions) {
  showToast(message, TYPE.WARNING, option)
}
export function showDefault(message: string, option?: PluginOptions) {
  showToast(message, TYPE.DEFAULT, option)
}
