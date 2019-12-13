export function NgLog(): MethodDecorator {
  return function(target: any, propertyKey: any, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function(...args) {
      const funcArgs = {};

      if (args.length > 0) {
        args.forEach((argument, index: number) => {
          funcArgs[`Argument value ${index + 1}`] = argument;
        });
      }

      if (original && 'name' in original) {
        console.log(`%c Function ${original.name}`, 'color: #4CAF50; font-weight: bold', funcArgs);
      } else {
        console.log(`%c Function ${propertyKey}`, 'color: #4CAF50; font-weight: bold', funcArgs);
      }

      return original && original.apply(this, args);
    };

    return descriptor;
  }
}
