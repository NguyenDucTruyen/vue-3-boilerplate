<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

interface InputProps {
  id?: string
  type?: string
  placeholder?: string
  label?: string
  name?: string
}
const props = withDefaults(defineProps<InputProps>(), {
  id: 'text',
  type: 'text',
  label: 'Text',
  name: 'text',
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.name" :validate-on-blur="false">
    <FormItem>
      <Label :for="props.id">{{ props.label }}</Label>
      <FormControl>
        <Input
          :id="props.id"
          :type="props.type"
          :placeholder="props.placeholder"
          v-bind="componentField"
        />
        <FormMessage class="error-message" />
      </FormControl>
    </FormItem>
  </FormField>
</template>

<style scoped>
  .error-message {
    margin-top: 4px !important;
  }
</style>
