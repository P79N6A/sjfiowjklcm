const getModal = function() {
  let modalDom = manager.modalDom
  if (manager.hasModal === false) {
    manager.hasModal = true
    modalDom = document.createElement('div')
    manager.modalDom = modalDom
    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault()
      event.stopPropagation()
    })
    modalDom.setAttribute('style', 'position:fixed;height: 100%; width: 100%;top:0;left:0;background:rgba(0,0,0,0.4);')
    modalDom.addEventListener('click', function() {
      manager.modelClick && manager.modelClick()
    })
  }
  return modalDom
}
const instances = {}
const manager = {
  hasModal: false,
  zIndex: 2000,
  modalStack: [],
  getInstance: function(id) {
    return instances[id]
  },
  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance
    }
  },
  deregister: function(id) {
    if (id) {
      instances[id] = null
      delete instances[id]
    }
  },
  nextZIndex: function() {
    return manager.zIndex++
  },
  open: function(id, zIndex, dom) {
    if (!id || zIndex === undefined) { return }
    if (this.modalStack.findIndex((item) => {
      return item.id == id
    }) > -1) {
      return
    }
    const modalDom = getModal()
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom)
    } else {
      document.body.appendChild(modalDom)
    }
    if (zIndex) {
      modalDom.style.zIndex = zIndex
    }
    modalDom.style.display = ''
    this.modalStack.push({ id: id, zIndex: zIndex })
  },
  close: function(id) {
    const modalStack = this.modalStack,
      modalDom = getModal()
    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1]
      if (topItem.id == id) {
        modalStack.pop()
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[this.modalStack.length - 1].zIndex
        }
      }
    } else {
      modalStack.forEach((item, i) => {
        if (item.id == id) {
          modalStack.splice(i, 1)
          return
        }
      })
    }
    if (modalStack.length == 0) {
      setTimeout(() => {
        if (modalStack.length == 0) {
          if (modalDom.parentNode)modalDom.parentNode.removeChild(modalDom)
          modalDom.style.display = 'none'
          manager.hasModal = false
          manager.modalDom = undefined
        }
      }, 0)
    }
  },
  modelClick() {
    const item = manager.modalStack[manager.modalStack.length - 1]
    if (!item) return
    const instance = manager.getInstance(item.id)
    if (instance && instance.modelClick) {
      instance._close()
    }
  }
}
export default manager
