import * as Data from './data'

export class Api {
  static find(modelName, regNumber) {
    return new Promise(resolve => {
      const result = Data[modelName].find(item =>
        (item.regNumber[0] + item.regNumber[item.regNumber.length - 1]) === regNumber ||
        (item.regNumber[0].toLowerCase() + item.regNumber[item.regNumber.length - 1]) === regNumber)
      setTimeout(() => resolve(result), 100)
    })
  }

  static search(modelName, _params) {
    const emptyParams = {
      term: '',
      regNumber: '',
      preorderTypeId: null,
      configurationId: null,
      environmentId: null,
      datacenterIds: [],
      isReplication: null,
      statuses: []
    }

    return new Promise(resolve => {
      const params = {...emptyParams, ..._params}
      const results = Data[modelName]
        .filter(item => !params.term || item.code.toLowerCase().includes(params.term.toLowerCase()) || item.title.toLowerCase().includes(params.term.toLowerCase()))
        .filter(item => !params.regNumber || item.regNumber.toLowerCase().includes(params.regNumber.toLowerCase()))
        .filter(item => !params.preorderTypeId || item.preorderTypeId === params.preorderTypeId)
        .filter(item => !params.configurationId || item.configurationId === params.configurationId)
        .filter(item => !params.environmentId || item.environmentId === params.environmentId)
        .filter(item => !params.datacenterIds || !params.datacenterIds.length || item.datacenterIds.some(_id => params.datacenterIds.includes(_id)))
        .filter(item => (!params.isReplication && params.isReplication !== false) || item.isReplication === params.isReplication)
        .filter(item => !params.statuses || !params.statuses.length || params.statuses.includes(item.status))


      const result = {
        count: results.length,
        results
      }

      setTimeout(() => resolve(result), 100)
    })
  }
}
