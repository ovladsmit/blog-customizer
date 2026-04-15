import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type ArticleParamsProps = { onApply: (params: OnApplyParam) => void };

type OnApplyParam = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};
export const ArticleParamsForm = ({ onApply }: ArticleParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toogle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const [fontSelected, setfontSelect] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeRadio, setFontSizeRadio] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColorSelected, setFontColorSelect] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColorSelected, setBackgroundColorSelectet] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthSelected, setContentWidthSelected] = useState(
		defaultArticleState.contentWidth
	);
	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply({
			fontFamilyOption: fontSelected,
			fontSizeOption: fontSizeRadio,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected,
		});
	};

	const reset = () => {
		setfontSelect(defaultArticleState.fontFamilyOption);
		setFontSizeRadio(defaultArticleState.fontSizeOption);
		setFontColorSelect(defaultArticleState.fontColor);
		setBackgroundColorSelectet(defaultArticleState.backgroundColor);
		setContentWidthSelected(defaultArticleState.contentWidth);
		onApply({ ...defaultArticleState });
	};

	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;
		const clickAway = (e: MouseEvent) => {
			if (!asideRef.current?.contains(e.target as HTMLElement)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', clickAway);
		return () => document.removeEventListener('mousedown', clickAway);
	}, [isMenuOpen]);
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toogle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={submit}>
					<Text size={31} weight={800} uppercase={true} family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={fontSelected}
						options={fontFamilyOptions}
						onChange={setfontSelect}
						placeholder='Выберите шрифт'
						title='шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSizeRadio}
						onChange={setFontSizeRadio}
						name='fontSize'
						title='размер шрифта'
					/>
					<Select
						selected={fontColorSelected}
						options={fontColors}
						onChange={setFontColorSelect}
						placeholder='Выберите цвет шрифта'
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColorSelected}
						options={backgroundColors}
						onChange={setBackgroundColorSelectet}
						placeholder='Выберите цвет фона'
						title='цвет фона'
					/>
					<Select
						selected={contentWidthSelected}
						options={contentWidthArr}
						onChange={setContentWidthSelected}
						placeholder='Выберите ширину контента'
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={reset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
