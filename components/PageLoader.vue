<template>
  <div
    class="fixed left-1/2 top-[calc(50%-2.5rem)] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%+3rem)] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
  >
    <div class="loader" />
  </div>
</template>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #0000;
  border-right-color: #38bdf9;
  position: relative;
  animation: l24 1s infinite linear;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: inherit;
  animation: inherit;
  animation-duration: 2s;
}
.loader:after {
  animation-duration: 4s;
}
@keyframes l24 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
