export const landingPositionValidator = (value: string) => {
	// const value = input.replace(/\s/g, "")

	if (typeof value !== 'string') {
		return false;
	}

	const firstTwoChars = value.substring(0, 2);
	if (!/^\d{2}$/.test(firstTwoChars)) {
		return false;
	}

	const lastChar = value.slice(-1);
	if (!/[a-zA-Z]/.test(lastChar)) {
		return false;
	}

	return true;
}