import axios from 'axios'
import { getURLParameters } from '../util/index'

axios.defaults.headers.common['X-Access-Token'] = getURLParameters(window.location.href).token

const basicUrl = getURLParameters(window.location.href).url

// 获取序列列表
export const getMedicalList = (id) => axios.get(`${basicUrl}/tailai-multiomics/multiomics/medicalImage/series/list?patient=${id}`)

// 获取图片详情
export const getImageList = (id) => axios.get(`${basicUrl}/tailai-multiomics/multiomics/medicalImage/instance/list?seriesInstanceUid=${id}`)

// 获取病人信息
export const getPatientsList = (id) => axios.get(`${basicUrl}/tailai-multiomics/multiomics/medicalImage/patients/list?id=${id}`)
