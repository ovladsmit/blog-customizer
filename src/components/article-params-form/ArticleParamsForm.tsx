import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
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
	const [isOpen, setIsOpen] = useState(false);
	const toogle = () => {
		setIsOpen(!isOpen);
	};

	const [fontSelected, setfontSelect] = useState(fontFamilyOptions[0]);
	const [fontSizeRadio, setFontSizeRadio] = useState(fontSizeOptions[0]);
	const [fontColorSelected, setFontColorSelect] = useState(fontColors[0]);
	const [backgroundColorSelected, setBackgroundColorSelectet] = useState(
		backgroundColors[0]
	);
	const [contentWidthSelected, setContentWidthSelected] = useState(
		contentWidthArr[0]
	);
	const submit = () => {
		onApply({
			fontFamilyOption: fontSelected,
			fontSizeOption: fontSizeRadio,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected,
		});
	};

	const reset = () => {
		onApply({ ...defaultArticleState });
	};

	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const clickAway = (e: MouseEvent) => {
			if (!asideRef.current?.contains(e.target as HTMLElement)) {
				setIsOpen(false);
			}

			return () => document.removeEventListener('mousedown', clickAway);
		};
		document.addEventListener('mousedown', clickAway);
		return () => document.removeEventListener('mousedown', clickAway);
	}, []);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toogle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
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
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={submit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
