import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleSetting, setArcticleSetting] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSetting.fontFamilyOption.value,
					'--font-size': articleSetting.fontSizeOption.value,
					'--font-color': articleSetting.fontColor.value,
					'--container-width': articleSetting.contentWidth.value,
					'--bg-color': articleSetting.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={setArcticleSetting} />

			<Article />
		</main>
	);
};
