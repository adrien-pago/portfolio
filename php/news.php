<?php
header('Content-Type: application/json');

// Les URL des flux RSS
$rss_urls = [
    'https://techcrunch.com/feed',
    'https://www.zdnet.com/news/rss.xml',
    'https://www.infoworld.com/index.rss'
];

$news_items = [];

foreach ($rss_urls as $rss_url) {
    // Charger le flux RSS
    $rss = simplexml_load_file($rss_url);
    
    // Convertir le flux RSS en tableau et prendre seulement les deux premiers articles
    $counter = 0;
    foreach ($rss->channel->item as $item) {
        if ($counter < 2) {
            $news_items[] = [
                'title' => (string) $item->title,
                'description' => (string) $item->description,
                'link' => (string) $item->link,
                'source' => $rss_url  // Ajout de la source pour chaque article
            ];
            $counter++;
        } else {
            break;  // Sortir de la boucle une fois que deux articles ont été pris
        }
    }
}

// Trier les articles par date de publication en supposant que chaque article a un champ 'pubDate'
usort($news_items, function($a, $b) {
    return strtotime($b['pubDate']) - strtotime($a['pubDate']);
});

// Réponse JSON
echo json_encode(['items' => $news_items]);
?>
