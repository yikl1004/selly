import { Module, VuexModule, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import BoardService from '@services/board'
import store from '@stores/index'
import { $dayjs } from '@utils/plugins/dayjs'
import toNumber from 'lodash/toNumber'
import { Responses, NoticeDetail, PolicyDetail, PolicyDetailDirect } from '@services/board.interface'

export interface BoardState {
    noticePageNo: string
    noticeList: Responses['noticeList'] | null
    noticeDetail: Responses['noticeDetail'] | null
    faqCategoryCode: string
    faqPageNo: string
    faqList: Responses['faqList'] | null
    faqCategory: Responses['faqCategory'] | null
    policyPageNo: string
    policyList: Responses['policyList'] | null
    policyDetail: Responses['policyDetail'] | null
    policyDetailDirect: Responses['policyDetailDirect'] | null
}

@Module({ name: 'board', namespaced: true, dynamic: true, store })
export default class Board extends VuexModule {
    public noticePageNo = '1'
    public noticeList: BoardState['noticeList'] = null
    public noticeDetail: BoardState['noticeDetail'] = null
    public faqCategoryCode = ''
    public faqPageNo = '1'
    public faqList: BoardState['faqList'] = null
    public faqCategory: BoardState['faqCategory'] = null
    public policyPageNo = '1'
    public policyList: BoardState['policyList'] = null
    public policyDetail: BoardState['policyDetail'] = null
    public policyDetailDirect: BoardState['policyDetailDirect'] = null

    @Mutation
    changeFaqCategory(categoryCode: string) {
        if (this.faqCategoryCode !== categoryCode) {
            this.faqPageNo = '1'
        }
        this.faqCategoryCode = categoryCode
    }

    @Mutation
    changeFaqPageNo({ more }: { more: boolean }) {
        if (more) {
            this.faqPageNo = `${toNumber(this.faqPageNo) + 1}`
        }
    }

    @Mutation
    initializePolicy() {
        this.policyDetail = null
        this.policyDetailDirect = null
    }

    @MutationAction
    async getNoticeList() {
        const state = this.state as BoardState
        const pageNo = state.noticePageNo
        const nextPageNo = `${toNumber(pageNo) + 1}`
        const isFirstPage = pageNo === '1'
        const { data } = await BoardService.getNoticeList({ pageNo })

        if (data) {
            return {
                noticeList: isFirstPage
                    ? data
                    : {
                          ...data,
                          data: {
                              ...data.data,
                              list: state.noticeList ? state.noticeList.data.list.concat(data.data.list) : data.data.list,
                          },
                      },
                noticePageNo: data.data.moreYn === 'Y' ? nextPageNo : pageNo,
            }
        }
    }

    @MutationAction
    async getNoticeDetail(params: NoticeDetail['Req']) {
        const { data } = await BoardService.getNoticeDetail(params)
        return {
            noticeDetail: data,
        }
    }

    @MutationAction
    async getFaqList() {
        const { faqPageNo, faqList } = this.state as BoardState
        const { faqPageNo: pageNo, faqCategoryCode: faqCtgDc } = this.state as BoardState
        const { data } = await BoardService.getfaqList({
            pageNo,
            faqCtgDc,
        })

        if (data) {
            return {
                faqList:
                    faqPageNo === '1'
                        ? data
                        : {
                              ...data,
                              data: {
                                  ...data.data,
                                  list: faqList?.data.list.concat(data.data.list),
                              },
                          },
            }
        }
    }

    @MutationAction
    async getFaqCategory() {
        const { data } = await BoardService.getFaqCategory()

        if (data) {
            data.data.list.unshift({
                faqCtgDc: '',
                faqCtgNm: '전체',
            })
            return {
                faqCategory: data,
            }
        }
    }

    @MutationAction
    async getPolicyList(params?: { more?: boolean }) {
        const { policyPageNo, policyList } = this.state as BoardState
        const nextPage = `${toNumber(policyPageNo) + (params?.more ? 1 : 0)}`
        const { data } = await BoardService.getPolicyList({
            pageNo: nextPage,
            comGrpC: 'AGR_COM',
        })

        if (data) {
            return {
                policyList: params?.more
                    ? {
                          ...data,
                          data: {
                              ...data.data,
                              list: policyList?.data.list.concat(data.data.list),
                          },
                      }
                    : data,
                policyPageNo: nextPage,
            }
        }
    }

    @MutationAction
    async getPolicyDetail(params: PolicyDetail['Req']) {
        const { data } = await BoardService.getPolicyDetail(params)
        return {
            policyDetail: data,
        }
    }

    // 직접 호출 케이스 3번
    @MutationAction
    async getPolicyDetailDirect(params: PolicyDetailDirect['Req']) {
        const { data } = await BoardService.getPolicyDetailDirect(params)
        return {
            policyDetailDirect: data,
        }
    }

    // 공지사항 리스트 반환
    get noticeListData() {
        return this.noticeList
            ? this.noticeList.data.list.map(item => ({
                  title: item.anTitNm,
                  date: $dayjs(item.fstCrtDtti).format('YYYY-MM-DD'),
                  seq: item.anSeq,
              }))
            : []
    }

    // 더보기 버튼 노출 여부
    get noticeMoreYN() {
        return this.noticeList?.data.moreYn === 'Y'
    }

    // 상세내용
    get noticeDetailData() {
        return {
            title: this.noticeDetail?.data.anTitNm,
            date: this.noticeDetail?.data.fstCrtDtti,
            content: this.noticeDetail?.data.anCn,
        }
    }

    // FAQ 카테고리 리스트
    get faqCategoryData() {
        return this.faqCategory
            ? this.faqCategory?.data.list.map(item => ({
                  name: item.faqCtgNm,
                  categoryCode: item.faqCtgDc,
              }))
            : []
    }

    // FAQ 리스트
    get faqListData() {
        return this.faqList
            ? this.faqList.data.list.map(item => ({
                  category: item.faqCtgNm,
                  title: item.faqTitNm,
                  desc: item.faqCnV,
              }))
            : []
    }

    // FAQ 더보기 노출 여부
    get faqMoreYN() {
        return this.faqList?.data.moreYn === 'Y'
    }

    // 이용약관 목록
    get policyListData() {
        return this.policyList
            ? this.policyList.data.list.map(item => ({
                  title: item.prvTitNm,
                  index: item.prvSeq,
              }))
            : []
    }

    // 이용약관 더보기 노출 여부
    get policyMoreYN() {
        return this.policyList?.data.moreYn === 'Y'
    }

    // 이용약관 상세
    get policyDetailData() {
        return {
            title: this.policyDetail?.data.prvTitNm,
            content: this.policyDetail?.data.prvCn,
        }
    }

    /** 이용약관 상세 - 직접 호출 */
    get policyDetailDirectData() {
        return {
            title: this.policyDetailDirect?.data.prvTitNm,
            content: this.policyDetailDirect?.data.prvCn,
        }
    }
}

export const BoardModule = getModule(Board)
