import toast from './toast/toast.js'
import {
  $alert,
  $confirm
} from './msgbox/msgbox.js'
import * as $loads from './ajax-load/index.js'
import {
  Message,
  Alert
} from 'element-ui'

function showMessage(val, type) {
  if (!type) {
    type = 'warning'
  }
  if (val) {
    val = val.replace('PT2TIGER（PT老虎机）', 'PT国际版')
    val = val.replace('PT2TIGER', 'PT国际版')
  }
  Message({
    dangerouslyUseHTMLString: true,
    showClose: true,
    message: val,
    type: type
  })
}
window.$alert = $alert
window.$confirm = $confirm
window.toast = showMessage
window.$load = $loads
// window.$open = $open
