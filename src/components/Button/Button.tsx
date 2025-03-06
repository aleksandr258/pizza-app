import cn from 'classnames';
import styles from '../Button/Button.module.css';

function Button({children, ...props}) {
	return (
		<button className='button accent' {...props} ></button>
	)
}

export default Button; 