import {Api} from '../api'

export default class ApplicationModel {
  modelName = ''
  caption = ''
  indexCaption = ''
  description = ''
  icon = ''

  static find(id) {
    return Api.find(this.modelName, id)
  }

  static search(params) {
    return Api.search(this.modelName, params)
  }

  static get modelName() {
    return new this().modelName
  }

  static get caption() {
    return new this().caption
  }

  static get indexCaption() {
    return new this().indexCaption
  }

  static get description() {
    return new this().description
  }

  static get icon() {
    return new this().icon
  }
}
