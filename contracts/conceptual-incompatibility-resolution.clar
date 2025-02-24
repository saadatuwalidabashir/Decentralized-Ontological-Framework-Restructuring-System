;; Conceptual Incompatibility Resolution Contract

(define-map incompatibilities uint
  { concept1: (string-utf8 64),
    concept2: (string-utf8 64),
    resolution: (string-utf8 128) })

(define-data-var next-incompatibility-id uint u0)

(define-public (register-incompatibility
    (concept1 (string-utf8 64))
    (concept2 (string-utf8 64))
    (resolution (string-utf8 128)))
  (let ((new-id (+ (var-get next-incompatibility-id) u1)))
    (var-set next-incompatibility-id new-id)
    (map-set incompatibilities new-id
      { concept1: concept1, concept2: concept2, resolution: resolution })
    (ok new-id)))

(define-read-only (get-incompatibility (id uint))
  (ok (map-get? incompatibilities id)))

