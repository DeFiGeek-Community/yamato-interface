# How to convert SVG to ReactComponent manually

## Use case

1. Cannot be converted by the standard Creat-React-App method - `import { ReactComponet as Logo } from'logo.svg'`.
2. Want to set some custom props.

note: If the above does not apply, you can use [this standard Creat-React-App method](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs).

## Steps

1. Put the source SVG files in `src/assets/svg/sources`.
2. `$ yarn svg:gen`
3. You will see the converted ReactComponents in `src/components/svgs`.

If you want to add some props, follow below:

4. Copy the folder with the suffix `-with-props`.
5. Edit the part you want to replace with props in the component.

note: Let's set it with the full path like `props.foo` so that you can easily find the changed part. Then we can search for `props.` to list them.
