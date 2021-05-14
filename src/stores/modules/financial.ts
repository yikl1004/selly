import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import FinacialService from '@services/financial'
import { instance } from '@services/core/http'
import axios from 'axios'

const $ = require('jquery')

export interface FinancialState {}

@Module({ name: 'financial', namespaced: true, stateFactory: true })
export class Financial extends VuexModule {
    data: any = ''

    @MutationAction({ mutate: ['data'] })
    async getData() {
        const ciNo = '0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w=='
        const url = `${process.env.VUE_APP_API_DOMAIN}/API/LGN/SELGNAA001`
        const method = 'POST'
        // const data = await instance.post('/API/LGN/SELGNAA001', { ciNo: 'lsakjdsldkj231' })
        // POST: params
        // GET: data
        // await instance.request({ method, url, params: { ciNo } })

        // await $.ajax({
        //     url,
        //     type: method,
        //     dataType: 'json',
        //     data: { ciNo },
        //     success(res: any) {
        //         console.log('@@@@@@@@@', res)
        //     },
        // })

        await FinacialService.getData(ciNo)

        return {
            data: 'sdsdsd',
        }
    }
}
