<template>
  <div style="margin: 50px; overflow-x: auto">
    <Container @drop="onDrop" orientation="horizontal">
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item-horizontal">{{item.data}}</div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "@/utils/helpers";
export default {
  name: "SimpleHorizontal",
  components: { Container, Draggable },
  data() {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    };
  },
  methods: {
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};
</script>
<style>
.smooth-dnd-container {
  position: relative;
}
.smooth-dnd-container * {
  box-sizing: border-box;
}
.smooth-dnd-container.horizontal {
  /* white-space: normal !important; */
}
.smooth-dnd-container.horizontal > .smooth-dnd-stretcher-element {
  display: inline-block;
}
.smooth-dnd-container.horizontal > .smooth-dnd-draggable-wrapper {
  height: 100%;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}
.smooth-dnd-container.vertical > .smooth-dnd-draggable-wrapper {
  overflow: hidden;
  display: block;
}
.smooth-dnd-draggable-wrapper {
  width: 20%;
  margin-bottom: 10px;
}
.smooth-dnd-draggable-wrapper.horizontal {
  width: 25%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}
.smooth-dnd-draggable-wrapper.vertical {
  overflow: hidden;
  display: block;
}
.smooth-dnd-draggable-wrapper.animated {
  transition: transform ease;
}
.smooth-dnd-ghost * {
  box-sizing: border-box;
}
.smooth-dnd-ghost.animated {
  transition: all ease-in-out;
}
.smooth-dnd-disable-touch-action * {
  touch-actions: none;
  -ms-touch-actions: none;
}
.smooth-dnd-no-user-select * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.draggable-item-horizontal {
  height: 300px;
  /* width: 25%; */
  padding: 10px;
  line-height: 100px;
  margin-right: 4px;
  border: solid 1px blue;
}
</style>