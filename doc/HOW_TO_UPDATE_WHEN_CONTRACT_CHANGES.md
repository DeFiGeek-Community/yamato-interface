A procedure of [yamato-interface](https://github.com/DeFiGeek-Community/yamato-interface) when contract changes

## required

1. Update contract addresses

- `src/constants/addresses.ts`

2. Update ABIs

- Run `npm run compile` in local repository of [yamato](https://github.com/DeFiGeek-Community/yamato)
- Copy `abis/yamato-abis` of [yamato](https://github.com/DeFiGeek-Community/yamato) to `src/infrastructures/abis/yamato` of [yamato-interface](https://github.com/DeFiGeek-Community/yamato-interface)
- Run `yarn contracts:compile` in local repository of [yamato-interface](https://github.com/DeFiGeek-Community/yamato-interface)

3. Deploy

### Dev Environment([dev-app.yamato.fi](https://dev-app.yamato.fi/))

- `git commit`
- `git push origin main`

## Optional

### revert reason

- Add added/changed reason to `function swapErrorToUserReadableMessage` in `src/hooks/yamato/helper.ts`.

### arguments/respons of method

- Change the mappings of parameter/response in `src/hooks/yamato/use[method]Callback.ts`.
- Change the relevant parts in `src/components`
