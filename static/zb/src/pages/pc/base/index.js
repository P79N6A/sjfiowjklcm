
import toast from './toast/toast.js'
import { $alert, $confirm } from './msgbox/msgbox.js'
import * as $loads from './ajax-load/index.js'
import { Message, Alert } from 'element-ui'
function showMessage(val,type){
    if(!type) {
        type = 'warning'
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
