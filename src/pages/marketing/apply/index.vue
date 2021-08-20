<template>
    <Page floating>
        <Header type="sub" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="1" :count="3" />
                <Title title="가맹점 정보 확인" />

                <div class="box-franchisee-list" :class="{ active: isActive }">
                    <div class="franchisee-list">
                        <ul>
                            <li>
                                <Radio
                                    label="한줄말줄임한줄말줄임한줄말줄임한줄말줄임한줄말줄임한줄말줄임ㅍ"
                                    name="radio01"
                                    value="value"
                                    :checked="true"
                                />
                            </li>
                            <li>
                                <Radio
                                    label="라벨1"
                                    name="radio01"
                                    value="value"
                                />
                            </li>
                            <li>
                                <Radio
                                    label="라벨1"
                                    name="radio01"
                                    value="value"
                                />
                            </li>
                            <li>
                                <Radio
                                    label="라벨1"
                                    name="radio01"
                                    value="value"
                                />
                            </li>
                            <li>
                                <Radio
                                    label="라벨1"
                                    name="radio01"
                                    value="value"
                                />
                            </li>
                            <li>
                                <Radio
                                    label="라벨1"
                                    name="radio01"
                                    value="value"
                                />
                            </li>
                        </ul>
                    </div>
                    <!--[D] 더보기 클릭시 더보기버튼 비노출-->
                    <BasicButton type="more" @click="onMore">
                        더보기
                    </BasicButton>
                </div>

                <div class="box-franchisee-info">
                    <ul>
                        <li>
                            <strong>가맹점 번호</strong>
                            <p>
                                <span>이층집 강남점 12345678</span>
                            </p>
                        </li>
                        <li>
                            <strong>가맹점 주소</strong>
                            <p>
                                <span>03272</span>
                                <span>
                                    서울특별시 종로구 세종대로 175 지하1층
                                    1203호
                                </span>
                            </p>
                        </li>
                        <li>
                            <strong>전화번호</strong>
                            <p>
                                <span>02-222-2222</span>
                            </p>
                        </li>
                    </ul>
                    <div class="btn-area">
                        <BasicButton type="textBlue">
                            가맹점 정보 변경하기
                        </BasicButton>
                    </div>
                </div>
                <BulletList :list="infoList" />
            </div>

            <portal to="floating">
                <BasicButton size="large">다음</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MarketingApply extends Vue {
    private infoList = [
        {
            text: '가맹점 정보를 변경할 경우 변경 다음날 부터 신청 가능합니다.',
        },
    ]
    /**
     * @category Data
     */
    /* 더보기버튼 */
    private isActive = false

    /**
     * @category Methods
     */
    /* 더보기 버튼 액션 */
    onMore() {
        this.isActive = true
    }
}
</script>

<style lang="scss" scoped src="./MarketingApply.scss"></style>
