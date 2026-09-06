/**
 * French elision helper.
 *
 * Service names are interpolated into templated copy ("prestations de X").
 * When X begins with a vowel or mute h, French requires elision — "de
 * application mobile" is ungrammatical and was rendering live on every
 * service x city page whose service starts with a vowel (Application
 * Mobile, E-commerce, Audit SEO). Answer engines quote headings verbatim,
 * so a broken H2 is both a quality and a citation problem.
 */
export function de(noun: string): string {
  return /^[aeiouyàâäéèêëîïôöûùü]|^h/i.test(noun.trim()) ? `d'${noun}` : `de ${noun}`;
}
