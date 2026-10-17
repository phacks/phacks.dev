import Link from 'next/link'
import {
  CalendaronsLayout,
  calendaronsPath,
} from '@/components/calendarons/Layout'
import { Prose } from '@/components/Prose'
import help from '@/content/calendarons-help.json'

export default function CalendaronsPrivacy() {
  return (
    <CalendaronsLayout
      title="Calendarons — Confidentialité"
      description="Comment Calendarons utilise vos évènements, iCloud, vos contacts et les données que vous choisissez de partager."
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Confidentialité
        </h1>
        <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
          Mis à jour le 17 octobre 2026
        </p>
        <Prose className="mt-10">
          <p>
            Calendarons est une application pour iPhone, iPad et Mac développée
            par Nicolas Goutay. Cette page explique ce qui reste sur vos
            appareils, ce qui passe par iCloud et ce que vous partagez avec
            votre partenaire.
          </p>
          <h2>Vos évènements</h2>
          <p>
            Vos évènements et vos préférences sont enregistrés sur votre
            appareil. L’app fonctionne sans créer de compte Calendarons. Elle ne
            contient ni publicité, ni outil de suivi publicitaire, ni service
            tiers de mesure d’utilisation.
          </p>
          <h2>La synchronisation avec iCloud</h2>
          <p>
            Si vous activez iCloud, votre calendrier personnel est synchronisé
            dans la base privée de votre compte Apple, avec CloudKit. Cela
            permet de retrouver vos évènements sur vos appareils. Des
            identifiants techniques, des versions et des marqueurs de
            suppression servent à synchroniser les modifications et à éviter de
            faire réapparaître un évènement supprimé.
          </p>
          <p>
            Vous pouvez désactiver la synchronisation dans les réglages de
            Calendarons. Cela arrête la synchronisation sur cet appareil, sans
            effacer les données déjà présentes dans iCloud. L’utilisation
            d’iCloud dépend aussi des réglages de votre compte Apple et de la{' '}
            <a href="https://www.apple.com/legal/privacy/fr-ww/">
              politique de confidentialité d’Apple
            </a>
            .
          </p>
          <h2>Le partage avec votre partenaire</h2>
          <p>
            Vos nouveaux évènements sont privés par défaut. Vous pouvez inviter
            une personne en utilisant l’adresse e-mail de son compte Apple.
            Cette adresse est utilisée pour préparer une invitation CloudKit ;
            votre partenaire doit l’accepter.
          </p>
          <ul>
            <li>
              <strong>Privé :</strong> l’évènement reste dans votre calendrier
              personnel.
            </li>
            <li>
              <strong>Visible :</strong> votre partenaire voit le nom et les
              détails de l’évènement. Vous seul pouvez le modifier.
            </li>
            <li>
              <strong>Commun :</strong> vous pouvez tous les deux modifier ou
              supprimer l’évènement. Seul son créateur peut changer sa
              visibilité.
            </li>
          </ul>
          <p>
            Les évènements partagés, l’état de votre partenariat et l’activité
            partagée passent par CloudKit. Votre prénom peut être transmis à
            votre partenaire et utilisé dans ses notifications. Vous pouvez
            arrêter le partage dans les réglages : vous conservez vos évènements
            et les évènements Communs comme copies privées ; les évènements
            Visibles de votre partenaire disparaissent de votre calendrier.
            Arrêter le partage ne peut pas effacer une capture ou une copie que
            l’autre personne aurait conservée.
          </p>
          <h2>Vos contacts</h2>
          <p>
            L’accès aux contacts est facultatif. Il sert à afficher les
            anniversaires et à reconnaître votre partenaire. Vous pouvez aussi
            inviter votre partenaire en saisissant son adresse e-mail, sans
            autoriser l’accès à Contacts.
          </p>
          <p>
            Les noms de votre profil et de votre partenaire peuvent se
            synchroniser entre vos appareils dans votre iCloud privé. Votre
            prénom peut être partagé avec votre partenaire. Les photos des
            contacts restent sur l’appareil ; l’ensemble de votre carnet
            d’adresses n’est pas transféré par Calendarons. Vous pouvez retirer
            l’autorisation Contacts dans les réglages du système.
          </p>
          <h2>Notifications et widgets</h2>
          <p>
            Si vous autorisez les notifications, Apple utilise un identifiant
            technique de votre appareil pour acheminer les alertes. Les
            notifications peuvent contenir un prénom, le nom d’un évènement et
            sa date. Leur aperçu peut être visible sur l’écran verrouillé ; vous
            pouvez en modifier l’affichage dans les réglages du système.
          </p>
          <p>
            Les widgets lisent une copie locale des données nécessaires à leur
            affichage. Ils peuvent montrer des noms d’évènements et des
            anniversaires sur l’écran d’accueil, l’écran verrouillé ou le
            bureau. Vous choisissez où les installer et pouvez les retirer à
            tout moment.
          </p>
          <h2>Sauvegardes et suppression</h2>
          <p>
            Les sauvegardes exportées contiennent vos évènements et les
            informations nécessaires à leur restauration. Elles sont
            enregistrées à l’endroit que vous choisissez. Si vous les partagez,
            leur destinataire peut en lire le contenu.
          </p>
          <p>
            Calendarons conserve aussi des copies de sécurité locales lors de
            certaines restaurations ou de conflits de synchronisation. Supprimer
            un évènement du calendrier ne le supprime pas des sauvegardes déjà
            créées. Les copies privées conservées par votre partenaire peuvent
            également subsister après l’arrêt du partage.
          </p>
          <p>
            Vous pouvez supprimer vos évènements depuis l’app. Si iCloud est
            activé, ces suppressions sont synchronisées avec vos autres
            appareils. Désinstaller l’app n’efface pas automatiquement les
            données présentes dans iCloud ni les sauvegardes exportées. Pour une
            demande de suppression ou une question sur les données restantes,
            contactez le développeur avant de désinstaller l’app.
          </p>
          <h2>Assistance et site web</h2>
          <p>
            Lorsque vous contactez le développeur, votre adresse e-mail et le
            contenu de votre message sont utilisés pour vous répondre et traiter
            le problème signalé. Le brouillon préparé dans l’app contient sa
            version et celle du système ; rien n’est envoyé sans votre action.
            Le résumé technique proposé ne contient ni vos évènements ni vos
            contacts. Évitez de joindre des données personnelles qui ne sont pas
            nécessaires à votre demande.
          </p>
          <p>
            Les pages Calendarons de phacks.dev sont hébergées par Vercel. La
            mesure d’audience Vercel Analytics est désactivée sur ces pages.
            L’hébergeur peut traiter des données techniques de connexion, comme
            votre adresse IP, pour servir et protéger le site. Le choix du thème
            clair ou sombre peut être mémorisé dans votre navigateur. Voir la{' '}
            <a href="https://vercel.com/legal/privacy-policy">
              politique de confidentialité de Vercel
            </a>
            .
          </p>
          <h2>Contact</h2>
          <p>
            Pour une question sur vos données ou une demande d’accès, de
            rectification ou de suppression, contactez Nicolas Goutay
            {help.publicEmail ? (
              <>
                {' '}
                à <a href={`mailto:${help.publicEmail}`}>{help.publicEmail}</a>
              </>
            ) : (
              <> depuis Réglages → Aide et contact dans l’app</>
            )}
            . Les données de votre compte Apple sont gérées par Apple ; le
            développeur ne dispose pas de votre mot de passe et ne peut pas
            ouvrir votre calendrier iCloud privé à votre place.
          </p>
          <p>
            <Link href={`${calendaronsPath}/support`}>
              Consulter l’aide Calendarons →
            </Link>
          </p>
        </Prose>
      </div>
    </CalendaronsLayout>
  )
}
