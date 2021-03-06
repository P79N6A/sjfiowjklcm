// import { request } from 'utils/fetch';
import request from '@/utils/request'

import qs from 'qs'
// import store from '../store/index.js';


// 获取上传的图片列表
export function getImgList() {
  return request({
    url: '/h5editor/getUploadFileList',
    method: 'post'
  });
}
// 获取上传的音频列表
export function getAudioList() {
  return request({
    url: '/h5editor/getAudioFileList',
    method: 'post'
  });
}

// 获取上传的视频列表
export function getVideoList() {
  return request({
    url: '/h5editor/getVideoFileList',
    method: 'post'
  });
}

// 删除文件（图片）
export function deleteImgList(data) {
  data = {
    filePath: JSON.stringify(data)
  }
  return request({
    url: '/h5editor/deleteFile',
    method: 'post',
    data: qs.stringify(data)
  });
}
// 清空文件（图片）
export function clearImgList(data) {
  data = {
    filePath: JSON.stringify(data)
  }
  return request({
    url: '/h5editor/wipeData',
    method: 'post',
    data: qs.stringify(data)
  });
}
// 获取默认验证列表
export function getValidateList() {
  return request({
    url: '/h5editor/getDefaultField',
    method: 'get'
  });
}
// 提交h5 json
export function postH5Page(data) {
  // const data = {
  //   data: JSON.stringify(json),
  //   type
  // };
  return request({
    url: '/h5editor/uploadH5Page',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 获取模版列表
export function getModuleList(pageSize, pageNum) {
  const data = {
    pageSize,
    pageNum
  };
  return request({
    url: '/h5editor/getModuleList',
    method: 'post',
    data: qs.stringify(data)
  });
}
// 获取活动列表
export function getActivityList(pageSize, pageNum) {
  const data = {
    pageSize,
    pageNum
  };
  return request({
    url: '/h5editor/getActivityList',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 提交配置信息
export function savePageConfig(data) {
  // id, paramJson
  // paramJson = JSON.stringify(paramJson);
  // const data = {
  //   id,
  //   paramJson
  // };
  return request({
    url: '/h5editor/savePageConfig',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 获取单个活动的json
export function getPageJson(id) {
  const data = {
    type: 1,
    id
  };
  return request({
    url: '/h5editor/getPageJson',
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getIshows(params) {
  return request({
    url: '/api/ishows',
    method: 'get',
    params
  })
}

export function getIshowShortId(data) {
  return request({
    url: '/api/ishows/shortId/' + data.shortId,
    method: 'get'
  })
}
export function getIshowOne(data) {
  return request({
    url: '/api/ishows/' + data._id,
    method: 'get'
  })
}
export function buyIshows(data) {
  return request({
    url: '/api/ishows/buy/' + data._id,
    method: 'get'
  })
}

export function addIshows(data) {
  return request({
    url: '/api/ishows',
    method: 'post',
    data
  })
}
export function updateIshows(data) {
  console.log(data)
  return request({
    url: '/api/ishows/' + data._id,
    method: 'put',
    data
  })
}

export function deleteIshows(data) {
  return request({
    url: '/api/ishows/' + data._id,
    method: 'delete',
    data
  })
}
