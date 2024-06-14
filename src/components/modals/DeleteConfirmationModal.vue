<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <button class="close-btn" @click="close">✖</button>
      <p>Are you sure you want to delete this card?</p>
      <button class="modal-btn confirm" @click="confirm">Yes</button>
      <button class="modal-btn cancel" @click="close">No</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);

  &-content {
    position: relative;
    background-color: #2c3e50;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #ecf0f1;

    .close-btn {
      position: absolute;
      right: -15px;
      top: -15px;
      padding: 5px 8px;
      border-radius: 25px;
      background: #e74c3c;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;

      &:hover,
      &:focus {
        color: #fff;
        text-decoration: none;
      }
    }

    .modal-btn {
      background: #e74c3c;
      border: none;
      color: #fff;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      margin: 10px;
      font-size: 16px;

      &.cancel {
        background: #3498db;
      }
    }
  }
}
</style>
