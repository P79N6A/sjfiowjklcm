
import toast from './toast/toast.js'
import { $alert, $confirm } from './msgbox/msgbox.js'
import * as $loads from './ajax-load/index.js'
// import { Toast } from 'mint-ui'
window.$alert = $alert
window.$confirm = $confirm
window.toast = toast
// window.Toast =  window.alert
window.$load = $loads


