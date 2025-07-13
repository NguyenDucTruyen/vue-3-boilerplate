<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import { showError, showInfo, showSuccess, showWarning } from '@/utils/toast'

const confirmStore = useConfirmStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <h3
      class="text-2xl font-bold text-center mt-4"
    >
      Welcome to the Home Page
    </h3>
    <div class="flex gap-2">
      <Button class="px-2 py-1 text-white rounded" @click="showSuccess('Success message!')">
        Show Toast success
      </Button>
      <Button
        class="px-2 py-1 text-white rounded"
        variant="destructive"
        @click="showError('error message!')"
      >
        Show Toast error
      </Button>
      <Button class="px-2 py-1 text-white rounded" @click="showWarning('warning message!')">
        Show Toast warning
      </Button>
      <Button class="px-2 py-1 text-white rounded" @click="showInfo('info message!')">
        Show Toast info
      </Button>
    </div>
    <div class="flex gap-4">
      <Button
        class="px-2 py-1 text-white rounded"
        @click="confirmStore.showConfirmDialog({
          title: 'Confirm Action',
          message: 'Are you sure you want to proceed?',
          confirmText: 'Yes',
          cancelText: 'No',
        })"
      >
        Show Confirmation Modal
      </Button>
      <Button
        class="px-2 py-1 text-white rounded"
        @click="confirmStore.showConfirmDialog({
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item?',
          confirmText: 'Delete',
          cancelText: 'Cancel',
        })"
      >
        Show Confirmation Modal with Delete Action
      </Button>
    </div>
    <ColorSelect />
  </div>
</template>
