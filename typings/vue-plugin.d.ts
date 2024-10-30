declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $sayHello: () => void
  }
}
