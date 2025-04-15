import { forwardRef } from 'react';
import styles from './Search.module.css'; 
import cn from 'classnames';
import { SearchProps } from './Search.props.ts';



const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({className, isValid = true, ...props}, ref) {
	return (
		<div className={styles['search-wrapper']}>
			<input {...props} ref={ref } className={cn(className, styles['input'], {
				[styles['invalid']]: !isValid
			})}>
			</input> 
			<img src="src/assets/search.svg" alt="find icon" className={styles['icon']}/>
		</div>
	);
});
 
export default Search;