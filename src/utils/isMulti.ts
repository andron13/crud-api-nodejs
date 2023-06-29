let isMultiArgument = process?.argv.filter((element) => element.startsWith('--isMulti'))[0];

export const isMulti: boolean = isMultiArgument?.split('=')[1] === 'true';
