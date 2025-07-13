<script setup lang="ts">
import { toast } from '@/components/ui/toast'

function showtoast() {
  toast({
    title: 'Hello from the Home Page',
    description: 'This is a toast message from the Home Page',
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <h3
      class="text-2xl font-bold text-center mt-4"
    >
      Welcome to the Home Page
    </h3>
    <Button class="px-2 py-1 text-white rounded" @click="showtoast">
      Show Toast
    </Button>
    <ColorSelect />
  </div>
</template>
