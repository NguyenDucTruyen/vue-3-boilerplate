import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export interface ConfirmDialogParams {
  title: string
  message: string
  cancelText?: string
  confirmText?: string
}

interface IConfirmStore {
  title: Ref<string>
  message: Ref<string>
  cancelText: Ref<string>
  confirmText: Ref<string>
  visible: Ref<boolean>
  showConfirmDialog: (params: ConfirmDialogParams) => Promise<unknown>
  cancel: () => void
  confirm: () => void
}

export const useConfirmStore = defineStore('confirm', (): IConfirmStore => {
  const title = ref('')
  const message = ref('')
  const cancelText = ref('Hủy')
  const confirmText = ref('Xác nhận')
  const visible = ref(false)
  let resolveFn: (value: boolean | PromiseLike<boolean>) => void

  function showConfirmDialog(params: ConfirmDialogParams) {
    visible.value = true
    title.value = params.title
    message.value = params.message
    cancelText.value = params.cancelText || 'Hủy'
    confirmText.value = params.confirmText || 'Xác nhận'
    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  function cancel() {
    visible.value = false
    resolveFn(false)
  }

  function confirm() {
    visible.value = false
    resolveFn(true)
  }
  return { title, message, visible, showConfirmDialog, cancel, confirm, cancelText, confirmText }
})
