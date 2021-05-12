<template>
    <div class="bottom-sheet">
        <transition
            name="bottom-sheet-dimm"
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <div v-show="show" class="dimm" @click="onClose" />
        </transition>
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown"
        >
            <div v-show="show" class="inner">
                <header v-if="!!title || !!subText" class="heading">
                    <h2 v-if="!!title" class="title">
                        {{ title }}
                    </h2>
                    <h3 v-if="!!subText" class="sub-text">
                        {{ subText }}
                    </h3>
                </header>
                <p v-if="!!description" class="dscription">
                    {{ description }}
                </p>
                <div class="image-area">
                    <img src="/" alt="" />
                </div>
                <ul v-if="!!list.length" class="select-options">
                    <li v-for="(item, index) in list" :key="`list-${index}`" :class="{ selected: item.selected }">
                        <button type="button" @click="onClickOption(index)">
                            {{ item.displayName }}
                        </button>
                    </li>
                </ul>
                <slot name="checkButton" />
                <button type="button" class="close" @click="onClose">
                    <span class="ir">닫기</span>
                </button>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type DesignType = 'select' | 'banner' | 'description'

export interface OptionItem {
	displayName: string
	value: string
	selected?: boolean
}

@Component
export default class BottomSheet extends Vue {
	/**
	 * @category Props
	 */

	/** 제목 */
	@Prop(String)
	readonly title!: string

	/** 부연설명 */
	@Prop(String)
	readonly description!: string

	/** 부연설명 */
	@Prop(String)
	readonly subText!: string

	/** 노출 여부 */
	@Prop({ type: Boolean, required: true })
	readonly show!: boolean

	/** 디자인 타입 */
	@Prop({ type: String, default: '' })
	readonly type!: DesignType

	/** 리스트 타입일 경우 */
	@Prop({ type: Array, default: () => ({}) })
	readonly list!: OptionItem[]

	/**
	 * @category Data(State)
	 */
	private transitionBeforeClass: string = ''

	/**
	 * @category Computed
	 */

	/**
	 * @category Methods
	 */
	onClose() {
		// TODO: 어떻게 만들지?...
		this.$emit('close')
	}

	afterEnter() {
		this.transitionBeforeClass = 'transition-before'
	}

	beforeEnter() {
		this.transitionBeforeClass = ''
	}

	onClickOption(index: number) {
		const selectedValue = this.list[index].value
		const list: OptionItem[] = this.list.map(option => {
			option.selected = option.value === selectedValue
			return option
		})

		/**
		 * list의 option 선택 시 트리거 되는 함수
		 * @event select-option
		 */
		this.$emit('select-option', selectedValue, list)
		this.onClose()
	}
}
</script>

<style lang="scss">
$transition: all 0.3s ease-in-out;

.bottom-sheet {
	--animate-duration: 300ms;
	.dimm {
		background-color: rgba(34, 34, 34, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	.inner {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2000;
		background-color: #fff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 24px;

		.heading {
			.title {
				font-size: 20px;
				font-weight: bold;
				line-height: 1.4;
				letter-spacing: -0.5px;
				color: #222222;
			}

			.sub-text {
				margin-top: 8px;
				font-size: 14px;
				line-height: 1.57;
				letter-spacing: -0.5px;
				color: #666;
			}

			.description {
				margin-top: 24px;
			}
		}

		.btn {
			margin-top: 24px;
		}

		.select-options {
			margin: 16px -24px 0;
			li {
				button {
					width: 100%;
					padding: 17px 24px;
					font-size: 14px;
					line-height: 1.57;
					color: #222;
					text-align: left;
				}

				&.selected {
					background-image: url('/assets/icon/icon-check-active.svg');
					background-repeat: no-repeat;
					background-position: right 8px center;
					background-size: 48px 48px;
					button {
						color: #5089ca;
					}
				}
			}
		}

		button.close {
			width: 48px;
			height: 48px;
			position: absolute;
			top: 14px;
			right: 12px;
			z-index: 10;
			background: url('/assets/icon/icon-cross.svg') no-repeat;
			background-size: 48px 48px;
		}
	}
}
</style>
